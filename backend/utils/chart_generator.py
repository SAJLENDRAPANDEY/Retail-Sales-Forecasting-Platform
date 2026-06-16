def generate_category_chart(
    df,
    sales_col,
    category_col
):

    result = []

    grouped = (
        df.groupby(category_col)[sales_col]
        .sum()
        .reset_index()
    )

    for _, row in grouped.iterrows():

        result.append({

            "name": row[category_col],

            "value": float(
                row[sales_col]
            )

        })

    return result