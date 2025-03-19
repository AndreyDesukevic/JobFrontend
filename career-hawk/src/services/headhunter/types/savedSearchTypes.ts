export interface SavedSearchItem {
    created_at: string; 
    id: string; 
    name: string; 
    subscription: boolean; 

    items: {
        count: number; 
        url: string; 
    };

    new_items: {
        count: number; 
        url: string; 
    };
}

export interface SavedSearchResponse {
    found: number; 
    items: SavedSearchItem[];
    page: number;
    pages: number;
    per_page: number;
}

export interface AddSavedSearchRequest {
    page?: number;               // Номер страницы
    per_page?: number;           // Количество элементов на странице
    text?: string;               // Текст для поиска вакансий
    name: string;                // Название поиска
    search_field?: string[];     // Область поиска
    experience?: string[];       // Опыт работы
    employment?: string[];       // Тип занятости
    schedule?: string[];         // График работы
    area?: string[];             // Регион
    metro?: string[];            // Станции метро
    professional_role?: string;  // Профессиональная роль
    industry?: string[];         // Индустрия
    employer_id?: string[];      // Идентификатор работодателя
    currency?: string;           // Код валюты
    salary?: number;             // Размер заработной платы
    label?: string[];            // Метки вакансий
    only_with_salary?: boolean;  // Только вакансии с указанной зарплатой
    period?: number;             // Период для поиска
    date_from?: string;          // Дата начала
    date_to?: string;            // Дата окончания
    top_lat?: number;            // Верхняя граница широты
    bottom_lat?: number;         // Нижняя граница широты
    left_lng?: number;           // Левая граница долготы
    right_lng?: number;          // Правая граница долготы
    order_by?: string;           // Сортировка вакансий
    sort_point_lat?: number;     // Географическая широта для сортировки
    sort_point_lng?: number;     // Географическая долгота для сортировки
    clusters?: boolean;          // Возвращать ли кластеры
    describe_arguments?: boolean; // Описание параметров поиска
    no_magic?: boolean;          // Отключение преобразования текста
    premium?: boolean;           // Учет премиум вакансий
    responses_count_enabled?: boolean; // Количество откликов
    part_time?: boolean;         // Вакансии для подработки
    locale?: string;             // Локализация
    host?: string;  
}