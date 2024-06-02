import {
  createClient,
  createAuthForPasswordFlow,
  createHttpMiddleware,
} from '@commercetools/sdk-client-v2';

const projectKey = 'your-project-key';

// Создание клиента SDK с аутентификацией по паролю
const client = createClient({
  middlewares: [
    createAuthForPasswordFlow({
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey,
      credentials: {
        clientId: 'your-client-id',
        clientSecret: 'your-client-secret',
        username: 'user-email',
        password: 'user-password',
      },
      scopes: ['manage_my_profile:your-project-key'],
      fetch,
    }),
    createHttpMiddleware({ host: 'https://api.europe-west1.gcp.commercetools.com', fetch }),
  ],
});

const apiRoot = createApiBuilderFromCtpClient(client);

// Функция для изменения пароля пользователя
async function changeCustomerPassword(currentPassword, newPassword) {
  // Выполняем логин пользователя для получения версии
  const loginResponse = await apiRoot
    .withProjectKey({ projectKey })
    .login()
    .post({ body: { email: 'user-email', password: currentPassword } })
    .execute();

  const customerVersion = loginResponse.body.customer.version;

  // Изменяем пароль пользователя
  const changePasswordResponse = await apiRoot
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version: customerVersion,
        actions: [
          {
            action: 'changePassword',
            currentPassword: currentPassword,
            newPassword: newPassword,
          },
        ],
      },
    })
    .execute();

  return changePasswordResponse.body;
}

// Вызов функции изменения пароля
const currentPassword = 'old-password';
const newPassword = 'new-password';

changeCustomerPassword(currentPassword, newPassword)
  .then((response) => {
    console.log('Password changed successfully');
  })
  .catch((error) => {
    console.error('Error changing password:', error);
  });
