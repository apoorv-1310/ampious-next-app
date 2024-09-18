"use client";
import * as React from "react";
import AdminLayouts from "./shared/AdminLayouts";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useAppSelector } from "@/store/store";
import { usePathname } from "next/navigation";
import Gyms from "./gyms/page";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Grid2,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  gridPaginationSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { IAdminResponse, IGymOwner, IGymOwnerResponse } from "../../interfaces";
import axios from "axios";

export const ErrorComponent = () => {
  return <h1>Error</h1>;
};

const AdminDashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const [gymOwners, setGymOwners] = React.useState<IGymOwnerResponse[]>([]);
  const [showAddModal, setShouldShowAddModal] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<IGymOwner>({
    fname: "",
    lname: "",
    phoneNo: "",
    email: "",
    password: "",
  });

  const columns: GridColDef<IGymOwnerResponse>[] = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "fname",
      headerName: "First name",
      width: 200,
      editable: true,
    },
    {
      field: "lname",
      headerName: "Last name",
      width: 200,
      editable: true,
    },
    {
      field: "phoneNo",
      headerName: "Phone No",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "createdOn",
      headerName: "Created Date",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "Action",
      headerName: "Action",
      type: "string",
      width: 110,
      renderCell: (params) => {
        return <Button onClick={() => deleteGo(params.row._id)}>Delete</Button>;
      },
    },
  ];

  React.useEffect(() => {
    GOs();
  }, []);

  const admin = useAppSelector((state) => state);
  const handleClose = () => {
    setShouldShowAddModal(false);
  };

  const GOs = () => {
    axios.get("/api/admin").then((response) => {
      setGymOwners(response.data);
    });
  };

  const deleteGo = (id: string) => {
    axios
      .delete("/api/admin", {
        data: {
          _id: id,
        },
      })
      .then((response) => {
        GOs();
      });
  };

  const updateForm = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const saveGO = () => {
    axios.post("/api/admin", form).then((response) => {
      GOs();
    });
  };

  return (
    <ErrorBoundary errorComponent={ErrorComponent}>
      <AdminLayouts />
      <Container>
        <Button
          variant="contained"
          onClick={() => {
            setShouldShowAddModal(true);
          }}
        >
          Add Gym Owner
        </Button>
        <DataGrid
          rows={gymOwners}
          columns={columns}
          getRowId={(row) => {
            return row._id;
          }}
          pagination={true}
          slotProps={{
            pagination: {
              labelDisplayedRows: ({ from, to, count }) =>
                `${from.toLocaleString("en")}-${to.toLocaleString("en")}`,
            },
            loadingOverlay: {
              variant: "linear-progress",
              noRowsVariant: "skeleton",
            },
          }}
        />
        <Pagination count={gymOwners.length / 10} color="primary" />

        <Dialog
          open={showAddModal}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Add New gym Owner</DialogTitle>
          <DialogContent>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="fname"
                  name="First Name"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    updateForm("fname", e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="lname"
                  name="Last Name"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    updateForm("lname", e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="email"
                  name="Email"
                  label="Email"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    updateForm("email", e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    updateForm("password", e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={saveGO}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ErrorBoundary>
  );
};

export default AdminDashboard;
