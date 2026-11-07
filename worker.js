// Read-only Cloudflare Worker. No public mutation routes or AI data collection.
const allowedCategories = new Set(['Football','Rugby','Running','Sneakers','Other']);
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/products' || request.method !== 'GET') {
      return new Response(JSON.stringify({error:'Not found'}), {status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
    }
    if (!env.DB) return new Response(JSON.stringify({error:'Inventory unavailable'}),{status:503,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
    const category = url.searchParams.get('category');
    if (category && !allowedCategories.has(category)) return new Response(JSON.stringify({error:'Invalid category'}),{status:400,headers:{'Content-Type':'application/json'}});
    const limit = Math.min(40,Math.max(1,Number.parseInt(url.searchParams.get('limit')||'20',10)||20));
    try {
      const stmt = category ? env.DB.prepare("SELECT id,title,brand,category,uk_size,colour,condition_grade,condition_notes,price_cents,image_url FROM products WHERE status='published' AND category=? ORDER BY created_at DESC LIMIT ?").bind(category,limit) : env.DB.prepare("SELECT id,title,brand,category,uk_size,colour,condition_grade,condition_notes,price_cents,image_url FROM products WHERE status='published' ORDER BY created_at DESC LIMIT ?").bind(limit);
      const {results} = await stmt.all();
      return new Response(JSON.stringify({products:results||[]}),{headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=30','X-Content-Type-Options':'nosniff'}});
    } catch(e) {
      return new Response(JSON.stringify({error:'Unable to load products'}),{status:500,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
    }
  }
};
