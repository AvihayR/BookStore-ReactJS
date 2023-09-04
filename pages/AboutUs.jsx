const { Outlet } = ReactRouterDOM

export function AboutUs() {
    return (
        <section>
            <h2>Us Sweet Us 🍩</h2>

            <section>

            </section>
            {/* ReactRouterDOM nested routes comp: */}
            <Outlet />
        </section>
    )
}
