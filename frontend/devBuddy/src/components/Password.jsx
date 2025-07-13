import { useSelector } from "react-redux";
const Password = () =>{
    const user = useSelector((store) => store?.user);

    return (
        <div>
                  {!!error && 
                  <Alert message ={error} status = {"fail"}/>}
                  
                  {/* <h2 className="card-title flex justify-center">Login</h2> */}
                  
                  <form onSubmit={handleLoginForm}>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend ml-2">Email</legend>
                      <input
                        type="email"
                        className="input ml-2"
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                      <p className="label ml-2">Required</p>
                    </fieldset>
                    
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend ml-2">Password</legend>
                      <input
                        type="password"
                        className="input ml-2"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                      <p className="label ml-2">Required</p>
                    </fieldset>
                    
                    <div className="card-actions flex justify-center ">
                      <button
                        type="submit"
                        className="btn bg-primary btn-md rounded-md w-1/3"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
        
    )


    
}
export default Password;