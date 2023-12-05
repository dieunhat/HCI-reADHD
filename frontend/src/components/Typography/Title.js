function Title({styleClass, children}){
    return(
        <div className={`text-2xl font-bold ${styleClass}`}>{children}</div>
    )
}

export default Title