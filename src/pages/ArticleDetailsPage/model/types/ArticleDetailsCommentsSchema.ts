import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

// EntityState - тип для нормализации данных (ids, entities)
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
    ids: string[];
    entities: Record<any, any>;
}
