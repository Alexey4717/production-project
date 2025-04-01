import { memo } from 'react';
import { getRouteProfile } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
                gap="8"
                max
                data-testid="CommentCard.Loading"
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        className={cls.username}
                        height={16}
                        width={100}
                    />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) return null;

    const { text, user } = comment;

    return (
        <VStack
            className={classNames(cls.CommentCard, {}, [className])}
            gap="8"
            max
            data-testid="CommentCard.Content"
        >
            <AppLink className={cls.header} to={getRouteProfile(user.id)}>
                {!!user?.avatar && <Avatar size={30} src={user?.avatar} />}
                <Text className={cls.username} title={user?.username} />
            </AppLink>
            <Text text={text} />
        </VStack>
    );
});
