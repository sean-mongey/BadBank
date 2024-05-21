const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const currentUserContext = React.createContext({name: '', email: '', password: '', balance: 0, index: 0, loginStatus: false, accountHistory:[]});
