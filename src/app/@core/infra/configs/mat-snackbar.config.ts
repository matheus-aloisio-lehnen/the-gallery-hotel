import { MatSnackBarConfig } from "@angular/material/snack-bar";

export const SNACKBAR = {
    success: { duration: 8000, panelClass: 'snackbar-success' } as MatSnackBarConfig,
    warning: { duration: 8000, panelClass: 'snackbar-warning' } as MatSnackBarConfig,
    error: { duration: 8000, panelClass: 'snackbar-error' } as MatSnackBarConfig,
}
