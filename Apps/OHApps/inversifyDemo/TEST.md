# inversify单元测试用例

该测试用例基于OpenHarmony系统下，采用[原库测试用例](https://github.com/inversify/InversifyJS/tree/master/test) 进行单元测试

单元测试用例覆盖情况

|                  接口名                   |是否通过	|备注|
|:--------------------------------------:|:---:|:---:|
|            Binding()             |    pass        |       |
|            BindingInSyntax()             |pass   |        |
|                BindingScopeEnum()                 |pass   |        |
|           inSingletonScope(data)            |pass   |        |
|              inTransientScope(data)              |pass   |        |
|            interfaces(data)            |pass   |        |
|          onActivation(data)           |pass  |     |
|            toConstantValue(data)             |   pass  |          |
|        toDynamicValue(data)        | pass |  |
|         toConstructor(data)          | pass  |       |
|           toFactory(data)           |  pass |          |
|            toFunction(data)             |  pass |          |
|       toAutoNamedFactory(data)        | pass  |          |
|              toAutoFactory(data)               | pass  |          |
|           getFactoryDetails(data)           |  pass |          |
|            Context(data)             |  pass |          |
|              Container()               | pass  |          |
|              Target(data)               | pass  |          |
|              Request()               | pass  |          |
|              BindingWhenSyntax(data)              |  pass |       |
|              constraint(data)              | pass  |       |
|              whenTargetIsDefault(data)              | pass  |          |
|               whenTargetNamed()               | pass  |         |
|               whenInjectedInto(data)               | pass  |       |
|               whenParentNamed(data)               | pass  |       |
|            whenParentTagged()             |  pass |       |
|            whenAnyAncestorIs(data)             |  pass |       |
|            whenNoAncestorIs(data)            | pass  |          |
|            whenAnyAncestorNamed(data)             |  pass |       |
|          whenNoAncestorNamed(data)           | pass  |          |
|             whenAnyAncestorTagged(data)              | pass |       |
|             whenNoAncestorTagged(data)              |  pass |       |
|            typeConstraint(data)            | pass  |          |
|             whenAnyAncestorMatches(data)             |pass   |          |
|           whenNoAncestorMatches(data)            | pass  |      |
|             ContainerModule(data)             |  pass |       |
|               getBindingDictionary()               | pass  |         |
|               getMap(data)               | pass  |       |
|               has(data)               | pass  |       |
|            get()             |  pass |       |
|            load(data)             |  pass |       |
|            unload(data)            | pass  |          |
|            bind(data)             |  pass |       |
|          unbind(data)           | pass  |          |
|             getServiceIdentifierAsString(data)              | pass |       |
|             unbindAsync(data)              |  pass |       |
|            unbindAll(data)            | pass  |          |
|             restore(data)             |pass   |          |
|           snapshot(data)            | pass  |      |
|             snapshot(data)             |  pass |       |
|             onDeactivation(data)             |  pass |       |
|               ModuleActivationStore()               | pass  |         |
|               isBound(data)               | pass  |       |
|               isCurrentBound(data)               | pass  |       |
|            getAllNamed()             |  pass |       |
|            getAllTagged(data)             |  pass |       |
|            createChild(data)            | pass  |          |
|            isBoundNamed(data)             |  pass |       |
|          getAll(data)           | pass  |          |
|             rebind(data)              | pass |       |
|             rebindAsync(data)              |  pass |       |
|            getTaggedAsync(data)            | pass  |          |
|             unloadAsync(data)             |pass   |          |
|           Plan(data)            | pass  |      |
|             addPlan(data)             |  pass |       |
|               POST_CONSTRUCT_ERROR()               | pass  |         |
|               @injectable()              | pass  |       |
|               @inject(data)               | pass  |       |
|            UNDEFINED_INJECT_ANNOTATION()             |  pass |       |
|            UNDEFINED_INJECT_ANNOTATION(data)             |  pass |       |
|            toSelf(data)            | pass  |          |
|            LazyServiceIdentifer(data)             |  pass |       |
|          toProvider(data)           | pass  |          |
|             katanaProvider(data)              | pass |       |
|             Lookup(data)              |  pass |       |
|            Metadata(data)            | pass  |          |
|             MetadataReader(data)             |pass   |          |
|           applyCustomMetadataReader(data)            | pass  |      |
|             ModuleActivationStore(data)             |  pass |       |
|               addActivation()              | pass  |       |
|               addDeactivation(data)               | pass  |       |
|            remove()             |  pass |       |
|            clone(data)             |  pass |       |
|            decorate(data)            | pass  |          |
|           multiInject(data)             |  pass |       |
|          optional(data)           | pass  |          |
|             tagged(data)              | pass |       |
|             targetName(data)              |  pass |       |
|            postConstruct(data)            | pass  |          |
|             unmanaged(data)             |pass   |          |
|           QueryableString(data)            | pass  |      |
|             fight(data)             |  pass |       |
|            preDestroy()             |  pass |       |
|            resolveInstance(data)             |  pass |       |
|            getFunctionName(data)            | pass  |          |
|           getSymbolDescription(data)             |  pass |       |
|          listMetadataForTarget(data)           | pass  |          |
|             isTagged(data)              | pass |       |
|             matchesArray(data)              |  pass |       |
|            isNamed(data)            | pass  |          |
|             multiBindToService(data)             |pass   |          |
|           toService(data)            | pass  |      |