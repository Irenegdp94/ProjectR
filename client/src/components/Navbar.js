import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const NavBar = (props) => {
	let navElements = [];
	props.roluser === "ADMIN"
		? (navElements = [
				{
					id: 0,
					link: '/',
					text: 'Log in'
				},
				{
					id: 1,
					link: '/new',
					text: 'Crear'
				},
                {
					id: 2,
					link: '/view',
					text: 'Ver'
				},

			])
		: (navElements = [
				{
					id: 3,
					link: '/',
					text: 'Log out'
				},
				{
					id: 4,
					link: '/private/session',
					text: 'Session'
				}
			]);
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand>Inicio</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					{navElements.map((navElement) => {
						return (
							<Nav.Link href={navElement.link} key={navElement.id}>
								{navElement.text}
							</Nav.Link>
						);
					})}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;