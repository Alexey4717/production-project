import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

// EntityState - тип для нормализации данных (ids, entities)
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
    // Это больше не нужно, т.к. extends от EntityState (там эти типы есть)
    // ids: string[];
    // entities: Record<any, any>;
}
