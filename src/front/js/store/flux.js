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

			register: async (InputEmail, InputPassword) => {
				try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/registrar", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email: InputEmail, password: InputPassword })
                    });

                    if (!response.ok) {
                        throw new Error("Error en el registro del usuario");
                    }

                    const data = await response.json();
                    console.log("Usuario registrado:", data);
                    
                } catch (error) {
                    console.error("Ha habido un error:", error.message);
                }
			},


			login: async (InputEmail, InputPassword) => {
				try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email: InputEmail, password: InputPassword })
                    });

                    if (!response.ok) {
						throw new Error("Error al iniciar sesión");
                    }

                    const data = await response.json();
                    console.log("Usuario autenticado:", data);
                    sessionStorage.setItem("token", data.token);
                    
                } catch (error) {
                    console.error("Error de autenticación:", error.message);
                }
			},

		}
	};
};

export default getState;
