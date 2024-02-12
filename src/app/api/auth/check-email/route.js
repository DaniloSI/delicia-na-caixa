import database from "@/services/database";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const isValid = (await database.getItem("emailsAdminGoogle")).includes(email);

  return Response.json({ isValid }, { status: isValid ? 200 : 401 });
}
