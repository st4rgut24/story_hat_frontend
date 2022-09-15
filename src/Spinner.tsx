import CircularProgress from '@mui/material/CircularProgress';

export default function Spinner(props: any) {
  return (
    <div>
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            {props.isLoading ? <CircularProgress size={70}/> : undefined}
        </div>
    </div>     
  );
}