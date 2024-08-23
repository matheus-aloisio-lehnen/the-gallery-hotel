import { MatSnackBarConfig } from "@angular/material/snack-bar";

export const SNACKBAR = {
    success: { duration: 8000, panelClass: 'bg-success' } as MatSnackBarConfig,
    warning: { duration: 8000, panelClass: 'bg-warning' } as MatSnackBarConfig,
    error: { duration: 8000, panelClass: 'bg-danger' } as MatSnackBarConfig,
}
