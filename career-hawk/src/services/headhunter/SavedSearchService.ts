import axios from "axios";
import { SavedSearchResponse, AddSavedSearchRequest } from "@/services/headhunter/types/savedSearchTypes";

const HH_API_URL = "https://api.hh.ru/saved_searches/vacancies";

export const hhSavedSearchService = {
    async getSavedSearches(accessToken: string): Promise<SavedSearchResponse> {
        try {
            const response = await axios.get<SavedSearchResponse>(HH_API_URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении сохраненных поисков:", error);
            throw error;
        }
    },

    async addSavedSearch(accessToken: string, searchData: AddSavedSearchRequest) {
        try {
            const response = await axios.post(HH_API_URL, searchData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при добавлении сохраненного поиска:", error);
            throw error;
        }
    },

    async deleteSavedSearch(accessToken: string, searchId: string) {
        try {
            const response = await axios.delete(`${HH_API_URL}/${searchId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.status;
        } catch (error) {
            console.error("Ошибка при удалении поиска:", error);
            throw error;
        }
    },
};