import apiRoot, { projectKey } from '../anonymFlow';

apiRoot().withProjectKey({ projectKey }).get().execute();
