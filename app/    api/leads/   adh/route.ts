export async function POST(r:Request){const b=await r.json();console.log("NEW ADH:",b);return Response.json({ok:true})}
