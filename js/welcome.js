const goToWriteOnClickButton = () => {
    Routes.getInstance().routeState = "todolist";
    Routes.getInstance().show();
};