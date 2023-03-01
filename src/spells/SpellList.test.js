import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SpellList from './SpellList';
import store from '../store';
import spellsApi from '../api/spells';

describe("SpellList tests", () => {
    beforeEach(() => {
        const spells = [
            {
                "index": "acid-arrow",
                "name": "Acid Arrow",
                "url": "/api/spells/acid-arrow"
            },
            {
                "index": "acid-splash",
                "name": "Acid Splash",
                "url": "/api/spells/acid-splash"
            },
            {
                "index": "aid",
                "name": "Aid",
                "url": "/api/spells/aid"
            },
            {
                "index": "alarm",
                "name": "Alarm",
                "url": "/api/spells/alarm"
            },
            {
                "index": "alter-self",
                "name": "Alter Self",
                "url": "/api/spells/alter-self"
            },
            {
                "index": "animal-friendship",
                "name": "Animal Friendship",
                "url": "/api/spells/animal-friendship"
            },
            {
                "index": "animal-messenger",
                "name": "Animal Messenger",
                "url": "/api/spells/animal-messenger"
            },
            {
                "index": "animal-shapes",
                "name": "Animal Shapes",
                "url": "/api/spells/animal-shapes"
            },
            {
                "index": "animate-dead",
                "name": "Animate Dead",
                "url": "/api/spells/animate-dead"
            },
            {
                "index": "animate-objects",
                "name": "Animate Objects",
                "url": "/api/spells/animate-objects"
            },
            {
                "index": "antilife-shell",
                "name": "Antilife Shell",
                "url": "/api/spells/antilife-shell"
            }
        ];
        jest.spyOn(spellsApi, "getSpells").mockImplementation(() =>
            Promise.resolve({
                results: spells
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('renders favourites expect it to be empty', () => {
        render(
            <Provider store={store}>
                <SpellList showFavourites={true} />
            </Provider >
        );

        const linkElement = screen.getByText(/No Spells/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders spells list with mock data', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <Router>
                        <SpellList />
                    </Router>
                </Provider >
            );
        })

        const rows = await screen.findAllByTestId("spell-row");
        expect(rows.length).toBe(10);
    });

    test('renders spells list and favourite a spell, then render favourites list', async () => {
        let renderResult;
        await act(async () => {
            renderResult = render(
                <Provider store={store}>
                    <Router>
                        <SpellList />
                    </Router>
                </Provider >
            );
        })

        const rows = await screen.findAllByTestId("FavoriteIcon");
        fireEvent.click(rows[0]);
        const favouritedRows = await screen.findAllByTestId("HeartBrokenIcon");
        expect(favouritedRows.length).toBe(1);

        await act(async () => {
            renderResult.rerender(
                <Provider store={store}>
                    <Router>
                        <SpellList showFavourites />
                    </Router>
                </Provider >
            );
        })
        const favouritedRows2 = await screen.findAllByTestId("HeartBrokenIcon");
        expect(favouritedRows2.length).toBe(1);
    });
});
