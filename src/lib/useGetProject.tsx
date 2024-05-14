import { useState, useEffect, useCallback } from 'react';
import { ApiRoot } from '@commercetools/platform-sdk';
import { projectKey } from '.';

const useGetProject = (client?: ApiRoot | undefined) => {
  const [projectDetails, setProjectDetails] = useState({});

  const getProject = useCallback(async (clientArg: ApiRoot | undefined) => {
    try {
      if (clientArg) {
        const project = await clientArg.withProjectKey({ projectKey }).customers().get().execute();
        setProjectDetails(project.body);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (client) {
      getProject(client);
    }
  }, [client, getProject]);

  return { projectDetails, getProject };
};

export default useGetProject;
