import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { tokens } from '@/theme/tokens';

/**
 * TEMPORARY — theme smoke test, not part of the design.
 *
 * Renders every token and type variant so the MUI config can be checked in a
 * browser. Delete this when the real bento home page lands.
 */

const swatches = Object.entries(tokens);

export default function Home() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 1100, mx: 'auto', py: 2 }}>
      <Typography variant="eyebrow">Theme smoke test</Typography>
      <Typography variant="h1">
        Tokens<Box component="span" sx={{ color: 'primary.main' }}>.</Box>
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(5, 1fr)' },
          gap: 1,
        }}
      >
        {swatches.map(([name, value]) => (
          <Box
            key={name}
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 'var(--r)',
              p: 'var(--pad)',
            }}
          >
            <Box
              sx={{
                height: 56,
                mb: 1,
                borderRadius: 2,
                bgcolor: value,
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Typography variant="statLabel" sx={{ display: 'block' }}>
              {name}
            </Typography>
            <Typography variant="mono" sx={{ textTransform: 'none' }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'var(--r)',
          p: 'var(--pad)',
        }}
      >
        <Typography variant="eyebrow">Type specimen</Typography>
        <Typography variant="h2">Tile heading, Bricolage 600</Typography>
        <Typography variant="h3">Card heading</Typography>
        <Typography variant="body1">
          Body copy in IBM Plex Sans at the 15px accessibility floor.
        </Typography>
        <Typography variant="body2">Secondary copy at 14px in muted.</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'baseline' }}>
          <Box>
            <Typography variant="statNumber" sx={{ display: 'block' }}>
              07
            </Typography>
            <Typography variant="statLabel">Stat label</Typography>
          </Box>
          <Button>Start here</Button>
        </Stack>
      </Box>

      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: 'var(--r)',
          p: 'var(--pad)',
        }}
      >
        <Typography variant="h2" sx={{ color: 'inherit', maxWidth: '13ch' }}>
          So what are we building?
        </Typography>
      </Box>
    </Stack>
  );
}
