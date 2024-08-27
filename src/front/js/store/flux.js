const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});


				//reset the global store
				setStore({ demo: demo });
			},

			// AQUI COMIENZAN LAS PETICIONES //

			register: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/register", {
						method: "POST",
						headers: { 
							"Content-Type": "application/json",
							
						},
						body: JSON.stringify({email: email, password: password})
					});
				
					if (!response.ok) {
						throw new Error("Error en la solicitud de registro");
					}
				
					const data = await response.json();
					console.log("Usuario registrado:", data);
					navigate("/login");
				} catch (error) {
					console.error("Error:", error.message);
				}
				
			},


			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: { 
							"Content-Type": "application/json"
						},
						body: JSON.stringify({email: email, password: password})
					});
				
					if (!response.ok) {
						throw new Error("Error en la solicitud de login");
					}
				
					const data = await response.json();
					console.log("Usuario autenticado:", data);
					sessionStorage.setItem("token", data.token);
					navigate("/private");
				} catch (error) {
					console.error("Error:", error.message);
				}
			},

			logout: async () => {
				sessionStorage.clear()
				setStore({ logged: false });
			}



		}
	};
};

export default getState;
