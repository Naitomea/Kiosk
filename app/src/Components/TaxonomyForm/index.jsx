import React, { useContext } from "react";
import { Box, Container, Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import { TaxonomyContext } from '../TaxonomyProvider';
import QuestionElement from "./QuestionElement";
import NoSelected from "../NoSelected";
import { isTaxonomyValid } from "../../Utils";

export default function TaxonomyForm() {
  const { taxonomy, nodes } = useContext(TaxonomyContext);
  const { topic, subTopic } = useParams();

  const isValid = isTaxonomyValid(taxonomy, topic, subTopic);
  const data = isValid
    ? taxonomy[topic][subTopic]
    : [];

  return !isValid
    ? (<NoSelected />)
    : (
      <Container style={{maxWidth: 800, padding: 0, margin: 0}}>
        {data.map((d, i) => {
          const node = nodes[d];
          const prevNode = i > 0 ? nodes[data[i - 1]] : null;
          
          const separatorRequired = prevNode && node.level < prevNode.level;

          return (
            <Box key={`${topic}_${subTopic}_${i}`}>
              {separatorRequired && <Divider sx={{my: 4, mx: -4}} />}
              <QuestionElement data={node} />
            </Box>
        )})}
      </Container>
    )
}