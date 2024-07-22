const VerifyCode = ({onClick, seconds = 60}) => {
    const [time, setTime] = useState(0)
    const timer = useRef(null)

    useEffect(() => {
        timer.current && clearInterval(timer.current);
        return () => timer.current && clearInterval(timer.current);
    }, []);

    useEffect(() => {
        if (time === seconds) timer.current = setInterval(() => setTime(time => --time), 1000)
        else if (time <= 0) timer.current && clearInterval(timer.current)
    }, [time])

    const getCode = () => {
        if (time) return;
        // 作为组件使用
        onClick?.(() => {
            setTime(seconds)
        })
        //直接使用
        setTime(seconds)
    }

    return (
        <div onClick={getCode}>
            {time ? `${time}秒后获取` : '获取验证码'}
        </div>
    )
}
export default VerifyCode;