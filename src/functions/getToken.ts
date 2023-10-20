import {
  AccountInfo,
  IPublicClientApplication,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";

export const getAccessToken = (
  {
    instance,
    accounts,
  }: { instance: IPublicClientApplication; accounts: AccountInfo[] },
  {
    onSuccess,
  }: {
    onSuccess: (token: string) => void;
  }
) => {
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };
  instance
    .acquireTokenSilent(accessTokenRequest)
    .then((accessTokenResponse: any) => {
      const jwt = accessTokenResponse.idToken;
      onSuccess(jwt);
    })
    .catch((error: any) => {
      if (error instanceof InteractionRequiredAuthError) {
        instance
          .acquireTokenRedirect(accessTokenRequest)
          .then(function (accessTokenResponse: any) {
            const jwt = accessTokenResponse.idToken;
            onSuccess(jwt);
          })
          .catch(function (error: any) {
            // Acquire token interactive failure

            console.log(error);
            //alert("Något gick fel med inloggninge, försök igen om en stund");
            alert("Du är nu inloggad, ladda om sidan för att registrera dig");
          });
      }
    });
};
