export async function GET() {
  return new Response(JSON.stringify({ message: "Hola Mundo" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
