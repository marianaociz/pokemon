const API_URL =
  "https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon";

export async function registerUser(
  username: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/auth/v1/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao registrar");
  }

  return response.json();
}

export async function loginUser(
  username: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/auth/v1/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getProfile(
  userId: string
) {
  const response = await fetch(
    `${API_URL}/auth/v1/stats/${userId}`
  );

  if (!response.ok) {
    throw new Error(
      'Erro ao buscar perfil'
    );
  }

  return response.json();
}

export async function updateProfile(
  userId: string,
  level: number,
  vitorias: number,
  derrotas: number
) {
  const response = await fetch(
    `${API_URL}/auth/v1/stats/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        level,
        vitorias,
        derrotas,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      'Erro ao atualizar perfil'
    );
  }

  return response.json();
}

export async function getTeam(
  userId: string
) {
  const response = await fetch(
    `${API_URL}/pokemon/v1/team?user-id=${userId}`
  );

  if (!response.ok) {
    throw new Error(
      'Erro ao buscar time'
    );
  }

  return response.json();
}