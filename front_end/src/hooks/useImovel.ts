/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { Imovel } from "../types/imovel";
import { getAllImoveis, createImovel, updateImovel, removeImovel } from "../services/imovelService";

export const useImovel = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllImoveis();
      setImoveis(data);
    } catch (err: any) {
      setError(err.message || "Error fetching properties");
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: Imovel) => {
    setLoading(true);
    setError(null);
    try {
      const newImovel = await createImovel(data);
      setImoveis((prev) => [...prev, newImovel]);
    } catch (err: any) {
      setError(err.message || "Error creating property");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number, data: Imovel) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateImovel(id, data);
      setImoveis((prev) =>
        prev.map((imovel) => (imovel.id === id ? updated : imovel))
      );
    } catch (err: any) {
      setError(err.message || "Error updating property");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await removeImovel(id);
      setImoveis((prev) => prev.filter((imovel) => imovel.id !== id));
    } catch (err: any) {
      setError(err.message || "Error deleting property");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { imoveis, loading, error, fetchAll, create, update, remove };
};
