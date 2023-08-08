import * as React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

interface IDestinationImagesProps {
  register: any;
  setImagesList: any;
}

const DestinationImages: React.FunctionComponent<IDestinationImagesProps> = ({
  register,
  setImagesList,
}) => {
  const [images, setImages] = React.useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Image selected...");
    console.dir(e);

    let fileArr = e?.target?.files ? e?.target?.files : [];
    setImagesList(fileArr);

    for (let i = 0; i < fileArr.length; i++) {
      const file = fileArr[i];
      const fr = new FileReader();

      // for (let file of fileArr) {
      // const fr = new FileReader();
      //  const fr = new FileReader();

      fr.addEventListener("load", () => {
        if (images?.length < 10) {
          setImages((images) => {
            const arr = [...images, fr.result as string];
            return arr.slice(0, 10);
          });
        }
      });
      if (file) fr.readAsDataURL(file);
    }
  };
  return (
    <Container>
      <Grid container spacing={1}>
        {Array.isArray(images) &&
          images?.map((img, i) => (
            <Grid item xs={2}>
              <img
                style={{
                  width: "100%",
                  height: 200,
                  border: " 1px solid #9999",
                }}
                src={img}
              />
            </Grid>
          ))}

        {images?.length < 10 && (
          <Grid item xs={2}>
            <label htmlFor="images">
              <img
                style={{
                  width: "100%",
                  height: 200,
                  border: " 1px solid #9999",
                }}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqm7-fvKK4HvVGn02j79Og5SjymuyZhsKj-w&usqp=CAU"
                }
              />
            </label>
            <input
              style={{
                display: "none",
              }}
              type="file"
              multiple
              id="images"
              {...register("images")}
              onChange={handleImageChange}
            />{" "}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DestinationImages;
