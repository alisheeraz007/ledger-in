import React from "react";
import { Route } from "react-router-dom";
// import { UsersLoadingDialog } from "./Users-loading-dialog/UsersLoadingDialog";
import  UsersEditDialog  from "./Users-edit-dialog/UsersEditDialog";
// import { UsersDeleteDialog } from "./Users-delete-dialog/UsersDeleteDialog";
// import { UsersDeleteDialog } from "./Users-delete-dialog/UsersDeleteDialog";
// import { UsersFetchDialog } from "./Users-fetch-dialog/UsersFetchDialog";
// import { UsersUpdateStateDialog } from "./Users-update-status-dialog/UsersUpdateStateDialog";
import { UsersUIProvider } from "./UsersUIContext";
import { UsersCard } from "./UsersCard";
import  UsersDeleteDialog  from './Users-delete-dialog/UsersDeleteDialog';

export function UsersPage({ history }) {
  const UsersUIEvents = {
    newUsersButtonClick: () => {
      history.push("/e-commerce/Users/new");
    },
    openEditUsersDialog: (id) => {
      history.push(`/e-commerce/Users/${id}/edit`);
    },
    openDeleteUsersDialog: (id) => {
      history.push(`/e-commerce/Users/${id}/delete`);
    },
    // openDeleteUsersDialog: () => {
    //   history.push(`/e-commerce/Users/deleteUsers`);
    // },
    openFetchUsersDialog: () => {
      history.push(`/e-commerce/Users/fetch`);
    },
    openUpdateUsersStatusDialog: () => {
      history.push("/e-commerce/Users/updateStatus");
    }
  }

  return (
    <UsersUIProvider UsersUIEvents={UsersUIEvents}>
      {/* <UsersLoadingDialog /> */}
       <Route path="/e-commerce/Users/new">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/Users");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/Users/:id/delete">
        {({ history, match }) => (
          <UsersDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/Users");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/Users/:id/edit">
        {({ history, match }) => (
          <UsersEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/Users");
            }}
          />
        )}
      </Route>
      <UsersCard />
    </UsersUIProvider>
  );
}
