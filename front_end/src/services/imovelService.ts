import type { Imovel } from "../types/imovel";

const BASE_URL = "http://localhost:8080";

export async function getAllImoveis(): Promise<Imovel[]> {
  const res = await fetch(`${BASE_URL}/imoveis/`);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function createImovel(data: Imovel): Promise<Imovel> {
  const res = await fetch(`${BASE_URL}/imoveis/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create property");
  return res.json();
}

export async function updateImovel(id: number, data: Imovel): Promise<Imovel> {
  const res = await fetch(`${BASE_URL}/imoveis/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
}

export async function removeImovel(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/imoveis/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete property");
}
