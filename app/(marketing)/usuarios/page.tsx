import { buscarTodosUsuarios } from "@/lib/drizzle/db/queries";

export default async function UsuariosPage() {
  const usuarios = await buscarTodosUsuarios();

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <div>
        {usuarios.map((usuario) => (
          <div key={usuario.id}>
            <h2 className="text-xl font-bold">
              Nome: <span className="font-semibold">{usuario.nome}</span>
            </h2>
            <p className="text-gray-600">Email: {usuario.email}</p>
            <p>
              <span className="font-semibold">Idade: </span>
              {usuario.idade} anos
            </p>
          </div>
        ))}
      </div>

      {usuarios.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          Nenhum usuario cadastradado ainda.
        </p>
      )}
    </div>
  );
}
