import Search from './Search';

export default function RootLayout({
    children,
}:{
    children:React.ReactNode;
}
){
    return (
        <main>
            <div>
                <h1>Search</h1>
            </div>
            <div>
                <Search/>
                <div>{children}</div>
            </div>
        </main>
    )
}