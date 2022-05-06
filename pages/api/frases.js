export default async function handler(req, res) {
    const frases = [
        {title: "Quién este libre de pecado que tire la primera piedra. ~ Juan 8,1-7", description: "Muchas veces juzgamos a los demás cuando nosotros hacemos lo mismo o incluso peor. Procuremos ser más tolerantes con los defectos de los que nos rodean. Intentemos  comprenderles y ponernos en su lugar."},
        {title: "La viga en el ojo ajeno. ~ Lucas 6,41-42", description: "Estamos dispuestos a criticar, a ver los defectos que nos molestan de nuestros semejantes, pero no vemos los nuestros. Si nos miramos en el espejo del alma y cada noche proponernos corregirlos y ser tolerantes y comprensivos para corregir con cariño los errores que veamos."},
        {title: "No tengáis miedo. ~ Juan 14,1", description: "¿De verdad confiamos en Él? ¿Ponemos nuestra vida en sus manos? Si le dejamos hacer su voluntad y no la nuestra, pensando que como Padre quiere lo mejor para nosotros, el miedo desaparecerá de nuestra vida."},
        {title: "Los soldados se burlan de él. ~ Lc 23, 36-37", description: "Siguen burlándose de Él. No entienden nada. Nosotros no vamos a negarle, no nos avergonzaremos de ser sus discípulos"},
        {title: "Aparta de mí este cáliz. ~ Lucas 22,42", description: "Jesús era hombre y sufrió enormemente. En nuestro camino hay desgracias y dificultades, pero si Él nos acompaña todo será más fácil. Nos dará fuerzas para continuar."},
        {title: "No os durmáis. ~ Mateo 26,46", description: "Nos dormimos, no estamos despiertos para hacer el bien. Solo pensamos en nosotros. La pereza nos vence. Debemos modificar esta actitud."},
        {title: "Perdónales porque no saben lo que hacen. ~ Lucas 23,24", description: "Debemos perdonar setenta veces siete, dice otra frase. Es difícil pero al menos debemos intentarlo una y otra vez. La misericordia es una virtud que no podemos escatimar."},
        {title: "Hoy estarás conmigo en el Paraíso. ~ Lc 23,43", description: "Es lo que nos espera si estamos dispuestos a seguirle. ¿Vale la pena ser mejor cada día? Dimas era un ladrón y se arrepintió. Nosotros estamos a tiempo de rectificar."},
        {title: "Dios mío, Dios mío, ¿por qué me has abandonado? ~ Mt 27,46", description: "No nos abandona, siempre está a nuestro lado, en ocasiones no le sentimos. El ruido y las prisas no nos dejan escucharle, pero siempre está dispuesto."},
        {title: "Tengo sed ~ Jn 19,28", description: "La oración, la ayuda constante al que nos necesita calmará nuestra sed espiritual."},
        {title: "Padre, en tu manos encomiendo mi Espíritu. ~ Lc 23,46", description: "Nos pondremos en sus manos, le dejaremos hacer. Nos irá mucho mejor. Así al final de nuestra existencia nos encontraremos con Él para toda la eternidad. La resurrección nos espera."}
    ]
      
    const num = Math.floor(Math.random() * (10 - 0));

    return res.status(200).json(frases[num]);
}