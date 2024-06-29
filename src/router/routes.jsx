import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import HomeIcon from '@mui/icons-material/Home';
const routes = [
    {
        path: "/",
        content: "Home",
        icon: <HomeIcon/>
    },
    {
        path: "/service",
        content: "Service",
        icon: <LocalPostOfficeIcon/>
    },
]

export default routes