import ShowRecipes from "../../../components/ShowRecipes/ShowRecipes"

interface ShowRecipesPageProps {
  type: string;
}

const ShowRecipesPage = ({ type }: ShowRecipesPageProps) => {
  return (
    <div>
      <ShowRecipes type={type} />
    </div>
  )
}

export default ShowRecipesPage
