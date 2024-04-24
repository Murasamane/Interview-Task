export const getTodos = async () => {
  try {
    const response = await fetch(
      "https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos"
    );

    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateRow = async (dataObj) => {
  try {
    const response = await fetch(
      `https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos/}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj), // Convert the object to a JSON string
      }
    );
    if (!response.ok) throw new Error("Failed to patch");

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateDeadline = async ({ id, deadline }) => {
  try {
    if (!deadline || isNaN(id)) return;
    const response = await fetch(
      `https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos/${Number(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deadline }), // Convert the object to a JSON string
      }
    );
    if (!response.ok) throw new Error("Failed to patch");

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
export const updateText = async ({ id, text }) => {
  try {
    if (text.length === 0) return;
    const response = await fetch(
      `https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos/${Number(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Convert the object to a JSON string
      }
    );

    if (!response.ok) throw new Error("Failed to patch");

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateCompleted = async ({ id, completed }) => {
  try {
    if (!completed || isNaN(id)) return;
    const response = await fetch(
      `https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos/${Number(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: completed }), // Convert the object to a JSON string
      }
    );

    if (!response.ok) throw new Error("Failed");

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteEntry = async (id) => {
  try {
    const response = await fetch(
      `https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos/${Number(id)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed");

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const createEntry = async (value) => {
  try {
    const response = await fetch(
      "https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value), // Convert the object to a JSON string
      }
    );

    if (!response.ok) throw new Error("Failed to create entry");

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
};
