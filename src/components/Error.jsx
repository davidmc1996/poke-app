import { Alert, Box } from "@mui/material";

export default function Error({ message }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100%',
        padding: 2,
      }}
    >
      <Alert severity="error" sx={{ maxWidth: 500, width: '100%', textAlign: 'center' }}>
        {message}
      </Alert>
    </Box>
  )
}