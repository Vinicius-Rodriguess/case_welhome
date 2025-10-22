/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useImovel } from "../hooks/useImovel";
import type { Imovel } from "../types/imovel";
import { toastError, toastInfo, toastSuccess } from "@/utils/toaster";

const ImoveisPage = () => {
  const { imoveis, loading, error, create, update, remove } = useImovel();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [formData, setFormData] = useState<{
    title: string;
    address: string;
    status: "active" | "inactive";
  }>({
    title: "",
    address: "",
    status: "active",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(imoveis.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImoveis = imoveis.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await update(editingId, formData as Imovel);
        toastInfo("Imóvel atualizado com sucesso!");
        setEditingId(null);
      } else {
        await create(formData as Imovel);
        toastSuccess("Imóvel criado com sucesso!");
      }
      setFormData({ title: "", address: "", status: "active" });
    } catch (err: any) {
      toastError(err.message || "Erro ao salvar imóvel");
    }
  };

  const handleEdit = (imovel: Imovel) => {
    setEditingId(imovel.id);
    setFormData({
      title: imovel.title,
      address: imovel.address,
      status: imovel.status as "active" | "inactive",
    });
  };

  const handleRemove = async (id: number) => {
    try {
      await remove(id);
      toastSuccess("Imóvel removido!");
    } catch (err: any) {
      toastError(err.message || "Erro ao remover imóvel");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-5 px-4">
      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-7xl bg-white rounded-xl shadow p-4 mb-10 space-y-4 flex flex-col"
      >
        <h2 className="text-xl font-semibold text-gray-700">
          {editingId ? "Editar Imóvel" : "Adicionar Imóvel"}
        </h2>
        <input
          type="text"
          placeholder="Título"
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
        <select
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "active" | "inactive",
            })
          }
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
        <div className="flex gap-2 justify-end">
          {editingId && (
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", address: "", status: "active" });
              }}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-[#E86F4B] text-white rounded-lg"
          >
            {editingId ? "Atualizar" : "Criar"}
          </button>
        </div>
      </form>

      {/* Mensagens de Status */}
      {loading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Validação de Imóveis Vazios */}
      {!loading && !error && imoveis.length === 0 && (
        <p className="text-gray-500 text-lg my-10 p-5 bg-white rounded-xl shadow">
          Nenhum imóvel cadastrado! Por favor, use o formulário acima para adicionar um novo imóvel.
        </p>
      )}

      {/* Listagem com estilo de cartão */}
      {imoveis.length > 0 && (
        <div className="w-full max-w-7xl grid gap-2">
          {currentImoveis.map((imovel: Imovel) => (
            <div
              key={imovel.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                <span className="font-semibold text-gray-700">
                  Titulo: {imovel.title}
                </span>
                <span className="text-gray-500">Endereço: {imovel.address}</span>
                <span>
                  Status:{" "}
                  <span
                    className={`capitalize font-medium ${
                      imovel.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {imovel.status}
                  </span>
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 bg-gray-700 text-white rounded-lg"
                  onClick={() => handleEdit(imovel)}
                  title="Editar"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="p-2 bg-[#E86F4B] text-white rounded-lg"
                  onClick={() => handleRemove(imovel.id)}
                  title="Remover"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação (Só é exibida se houver imóveis) */}
      {imoveis.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mt-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Itens por página:</span>
            <select
              className="border border-gray-300 rounded p-2"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImoveisPage;