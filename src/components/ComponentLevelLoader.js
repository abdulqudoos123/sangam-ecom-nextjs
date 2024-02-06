import { PulseLoader } from 'react-spinners'

const ComponentLevelLoader = ({ text, color, loading, size }) => {
    return (
        <span className='flex gap-1 items-center'>
            {text}
            <PulseLoader
                color={color}
                loading={loading}
                size={size || 10}
                data-testid="loader"
            />
        </span>
    )
}

export default ComponentLevelLoader
