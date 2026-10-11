    export async function POST(r:Request){const b=await r.json();console.log("NEW LEAD:",b);return Response.json({ok:true})}
