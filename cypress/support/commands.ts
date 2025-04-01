import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);

// Пример переопределения команд
// Cypress.Commands.overwrite('intercept', () => {
//     const FIXTURE_MODE = process.env.FIXTURE_MODE;
//     const fixtureName = req.METHOD + req.url + hash(req.body);
//     if (FIXTURE_MODE === 'READ') {
//         // фикстуры не списываем, а считываем из существующих
//         // название фикстур можно брать из url или брать hash-сумму из url (чтоб были уникальными)
//         readFixture(fixtureName);
//     }
//     if (FIXTURE_MODE === 'WRITE') {
//         // Можно получать данные из запроса и на основании этих данных фикстуру из запроса записывать
//         createFixture(fixtureName, req.body);
//         // т.е. прогоняем тесты в релизе, происходят запросы за реальными данными, сохраняются в фикстуры,
//         // а потом, где-нибудь в CI, чтобы сервер не перегружать, используем фикстуры.
//     }
//     if (FIXTURE_MODE === 'API') {}
// });
