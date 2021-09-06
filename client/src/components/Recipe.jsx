import React, { useState, useEffect } from "react";
import axios from "axios";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    recipe: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [updateDetails, setUpdateDetails] = useState({
    status: false,
    id: "",
  });

  const [updateValue, setUpdateValue] = useState({
    name: "",
    ingredients: "",
    recipe: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/getRecipes")
      .then(({ data }) => {
        setRecipes(data.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipes]);

  const createNewRecipe = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/createRecipe", newRecipe)
      .then((addedRecipe) => {
        console.log(addedRecipe);
        setSuccess(" New Recipe added Successfully !");
      })
      .catch((err) => {
        setError("Failed to add new Recipe !");
        console.log(err);
      });
    setNewRecipe({
      name: "",
      ingredients: "",
      recipe: "",
    });
    setError("");
    setSuccess("");
  };

  const deleteRecipe = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/deleteRecipe/${id}`)
      .then((res) => {
        alert("Recipe Deleted Successfully !");
      })
      .catch((err) => {
        alert("Uh Oh!, Error Occured : Recipe Could not be deleted !");
      });
  };

  const updateRecipe = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:5000/api/v1/updateRecipe/${updateDetails.id}`,
        updateValue
      )
      .then((updatedRecipe) => {
        console.log(updatedRecipe);
        setSuccess("Recipe updated successfully!");
      })
      .catch((err) => {
        setError("Uh Oh!, Error Occured : Recipe Could not be updated ");
      });

    setUpdateValue({
      name: "",
      ingredients: "",
      recipe: "",
    });
    setError("");
    setSuccess("");
    setUpdateDetails({
      ...updateDetails,
      status: false,
    });
  };

  //MAKES THE UPDATE FORM SO THAT USERS CAN EDIT THE EXISTING DATA
  const updateForm = (data) => {
    setUpdateValue({
      name: data.name,
      ingredients: data.ingredients,
      recipe: data.recipe,
    });
  };

  const newOnChange = (e, changedValue) => {
    setNewRecipe({
      ...newRecipe,
      [changedValue]: e.target.value,
    });
  };

  const updateOnChange = (e, changedValue) => {
    setUpdateValue({
      ...updateValue,
      [changedValue]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <br />
        <form className="container-lg my-10">
          <h2>{updateDetails.status ? "Update Recipe" : "Create Recipe"}</h2>
          <div className="form-group">
            <label for="exampleInputEmail1">Food Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              aria-describedby="emailHelp"
              value={updateDetails.status ? updateValue.name : newRecipe.name}
              onChange={
                updateDetails.status
                  ? (e) => {
                      updateOnChange(e, "name");
                    }
                  : (e) => {
                      newOnChange(e, "name");
                    }
              }
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Ingredients</label>
            <input
              value={
                updateDetails.status
                  ? updateValue.ingredients
                  : newRecipe.ingredients
              }
              required
              type="text"
              name="ingredients"
              className="form-control"
              id="ingredients"
              onChange={
                updateDetails.status
                  ? (e) => {
                      updateOnChange(e, "ingredients");
                    }
                  : (e) => {
                      newOnChange(e, "ingredients");
                    }
              }
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Recipe</label>
            <textarea
              required
              name="recipe"
              class="form-control"
              id="recipe"
              value={
                updateDetails.status ? updateValue.recipe : newRecipe.recipe
              }
              rows="3"
              onChange={
                updateDetails.status
                  ? (e) => {
                      updateOnChange(e, "recipe");
                    }
                  : (e) => {
                      newOnChange(e, "recipe");
                    }
              }
            ></textarea>
          </div>
          <div>{error && <p className="text-danger"> {error} </p>}</div>
          <div>{success && <p className="text-success"> {success} </p>}</div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={
              updateDetails.status
                ? (e) => {
                    updateRecipe(e);
                  }
                : (e) => {
                    createNewRecipe(e);
                  }
            }
          >
            {updateDetails.status ? "Update the Recipe" : "Add New Recipe"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div>
        <br />
        <div className="container-lg">
          <h2>Recipes</h2>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Food Name</th>
                <th scope="col">Ingredients</th>
                <th scope="col">Recipe</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr>
                  <td>{recipe.name}</td>
                  <td>{recipe.ingredients}</td>
                  <td>{recipe.recipe}</td>

                  <td className="d-flex border-bottom-0 border-right-0 border-left-0">
                    <button
                      onClick={() => deleteRecipe(recipe.$id)}
                      type="button"
                      class="btn btn-danger mx-1"
                    >
                      <i class="fas fa-trash "></i>
                    </button>
                    <button
                      onClick={() => {
                        setUpdateDetails({
                          status: true,
                          id: recipe.$id,
                        });
                        updateForm(recipe);
                      }}
                      type="button"
                      class="btn btn-success mx-1"
                    >
                      <i class="fas fa-pen"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
