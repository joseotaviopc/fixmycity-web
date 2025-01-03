import { Database } from "@/services/database.types";
import { z } from "zod";

export const categories = [
    {
        label: "Problemas de Infraestrutura",
        value: "problemas-de-infraestrutura",
        options: ["Buracos", "Problemas de iluminação pública", "Problemas de drenagem"],
    },
    { label: "Preocupações Ambientais", value: "preocupacoes-ambientais", options: ["Lixo ou detritos", "Grafites", "Poluição sonora"] },
    { label: "Segurança Pública", value: "segurança-publica", options: ["Sinais de tráfego quebrados", "Veículos abandonados", "Atividades suspeitas"] },
    { label: "Parques e Recreação", value: "parques-e-recreacao", options: ["Vegetação alta", "Equipamentos de parque quebrados", "Lixo em parques"] },
    {
        label: "Transporte",
        value: "transporte",
        options: ["Congestionamento de Trânsito", "Problemas de segurança para pedestres/ciclistas", "Problemas do transporte público"],
    },
    {
        label: "Gerenciamento de Resíduos",
        value: "gerenciamento-de-residuos",
        options: ["Latas de lixo transbordando", "Lixeiras de reciclagem faltando", "Despejo ilegal"],
    },
    {
        label: "Violações do Código de Construção",
        value: "violacoes-do-codigo-de-construcao",
        options: ["Danos estruturais", "Violações de zoneamento", "Infrações ao código de construção"],
    },
    { label: "Controle de Animais", value: "controle-de-animais", options: ["Caes soltos", "Gatos selvagens", "Problemas com animais selvagens"] },
    { label: "Serviços Emergenciais", value: "servicos-emergenciais", options: ["Riscos de incêndio", "Emergências médicas", "Riscos de desastres naturais"] },
    {
        label: "Desenvolvimento Comunitário",
        value: "desenvolvimento-comunitario",
        options: ["Remoção de pragas", "Problemas de propriedades vagas", "Sugestões de embelezamento de bairros"],
    },
] as const;

export const priorities = [
    { label: "urgent", value: "urgent" },
    { label: "high", value: "high" },
    { label: "medium", value: "medium" },
    { label: "low", value: "low" },
];
export const categoriesType = ["pothole", "broken_streetlight", "graffiti", "overflowing_gutter"] as const;
export const prioritiesType = ["urgent", "high", "medium", "low"] as const;

export const category = z.enum(categoriesType);
const priority = z.enum(["urgent", "high", "medium", "low"]);
const status = z.enum(["pending", "in_progress", "resolved"]);

export const issueSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().optional(),
    location: z.string(),
    category: z.string(), // CHANGE
    subCategory: z.string().optional(),
    priority,
    status,
    reportedBy: z.string(),
    reportedAt: z.date(),
    resolvedBy: z.string().optional(),
    resolutionNotes: z.string().optional(),
    resolvedAt: z.date().optional(),
    synced: z.boolean().default(false),
});

export type Issue = z.infer<typeof issueSchema>;
export type Category = z.infer<typeof category>;
export type Priority = z.infer<typeof priority>;
export type Status = z.infer<typeof status>;

export interface IssueFromDb {
    category: string;
    description: string;
    id: string;
    image: string | null;
    location: string | null;
    priority: Database["public"]["Enums"]["Priority"];
    reportedAt: string;
    reportedBy: string | null;
    resolutionNotes: string | null;
    resolvedAt: string | null;
    resolvedBy: string | null;
    status: Database["public"]["Enums"]["Status"];
    synced: boolean;
    title: string;
}
