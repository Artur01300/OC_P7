const article = mongoose.Schema({
    id: {type: String, required: true},//La clé du nome de chemps est 'userId' et on crée un objet pour confiqurer le id
    tatle: {type: String, required: true},//required ture signifie sans name on ne pourra pas enrégistrer un sauce dans la base
    content: {type: String, required: true},
    create_at: {type: String, required: true},
    image: {type: String, required: true},
    imageUrl: {type: String, required: true},
});