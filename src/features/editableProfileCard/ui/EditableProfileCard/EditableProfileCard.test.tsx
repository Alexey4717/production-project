import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { $api } from 'shared/api/api';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin213',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1', // должен быть тот же что и в профиле, для имитации редактирования своего профиля
                username: 'admin213',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('readonly must switch', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('After cancel editing values must return on initials', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(profile.first);
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(profile.lastname);
    });

    test('Error has to occur', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('If there are not errors, the PUT query must fetching on server', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        expect(mockPutReq).toHaveBeenCalled();
    });
});
