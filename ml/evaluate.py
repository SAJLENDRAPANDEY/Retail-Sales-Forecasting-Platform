from sklearn.metrics import mean_absolute_error,mean_squared_error,r2_score

import numpy as np

def evaluate_model(name,y_test,predictions):
    mae=mean_absolute_error(y_test,predictions)
    rmse=np.sqrt(mean_squared_error(y_test,predictions))
    r2=r2_score(y_test,predictions)

    print("\n", "="*40)
    print(name)
    print("="*40)

    print("MAE :", round(mae,2))
    print("RMSE:", round(rmse,2))
    print("R2  :", round(r2,4))
