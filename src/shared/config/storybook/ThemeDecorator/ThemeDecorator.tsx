import { Theme } from 'app/providers/ThemeProvider';

// TODO fix any
export const ThemeDecorator = (theme: Theme) => (StoryComponent: any) => (
    <div
        className={`app ${theme}`}
        style={{
            position: 'absolute', top: 0, left: 0, width: '100%', // Костыль, чтоб на всю ширину сделать
        }}
    >
        <StoryComponent />
    </div>
);
